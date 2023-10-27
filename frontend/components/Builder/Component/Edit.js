import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import useTranslation from "next-translate/useTranslation";

import useForm from "../../../lib/useForm";

import { UPDATE_TEMPLATE } from "../../Mutations/Template";
import { UPDATE_TASK } from "../../Mutations/Task";
import ComponentForm from "./Form";

import { MY_TASK } from "../../Queries/Task";

import UploadFile from "./Template/UploadFile";

export default function EditComponent({
  query,
  user,
  taskId,
  close,
  updateCanvas,
}) {
  const area = query?.area || undefined;

  const router = useRouter();
  const { t } = useTranslation("common");

  const { data, error, loading } = useQuery(MY_TASK, {
    variables: { id: taskId },
  });

  const task = data?.task || {
    title: "",
    description: "",
  };

  const { inputs, handleChange, handleMultipleUpdate, clearForm } = useForm({
    ...task,
  });

  useEffect(() => {
    async function fetchFile() {
      // get the file and put it in inputs?.script
      const url = `/api/templates/${task?.template?.slug}/script`;
      const res = await fetch(url);
      const data = await res.text();
      handleMultipleUpdate({
        template: {
          ...inputs?.template,
          script: data,
        },
      });
    }
    if (inputs?.template?.slug) {
      fetchFile();
    }
  }, [inputs?.template?.slug]);

  // check whether the user is the author or a collaborator on the original template of the task
  const isTemplateAuthor =
    user?.id === inputs.template?.author?.id ||
    inputs?.template?.collaborators?.map((c) => c.id).includes(user?.id);

  const [
    updateTemplate,
    { data: templateData, loading: templateLoading, error: templateError },
  ] = useMutation(UPDATE_TEMPLATE, {
    variables: inputs?.template,
  });

  const [
    updateTask,
    { data: taskData, loading: taskLoading, error: taskError },
  ] = useMutation(UPDATE_TASK, {
    variables: inputs,
    refetchQueries: [{ query: MY_TASK, variables: { id: taskId } }],
  });

  async function handleSubmit() {
    // update the template
    if (inputs?.template && isTemplateAuthor) {
      // save files in the file system and store their addresses
      // Find the absolute path of the json directory
      const { scriptAddress, fileAddress } = await UploadFile({
        script: inputs?.template?.script,
        file: inputs?.template?.file,
        name: inputs?.template?.slug,
      });

      handleMultipleUpdate({
        template: {
          ...inputs?.template,
          scriptAddress, // string
          fileAddress, // JSON object
        },
      });

      await updateTemplate({
        variables: {
          collaborators: inputs?.template?.collaborators.map((col) => ({
            id: col?.id,
          })),
          script: null,
          file: null,
          scriptAddress,
          fileAddress,
        },
      });
    }
    // update the task
    await updateTask({
      variables: {
        collaborators: inputs?.collaborators.map((col) => ({ id: col?.id })),
        template: null,
      },
    });
  }

  return (
    <ComponentForm
      user={user}
      inputs={inputs}
      handleChange={handleChange}
      handleMultipleUpdate={handleMultipleUpdate}
      handleSubmit={handleSubmit}
      submitBtnName={t("update")}
      loading={templateLoading || taskLoading}
      error={templateError || taskError}
      isTemplateAuthor={isTemplateAuthor}
      close={close}
    />
  );
}
