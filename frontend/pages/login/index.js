import Site from "../../components/Global/Site";
import Page from "../../components/Global/Page";
import Form from "../../components/Global/Form";
import Login from "../../components/Auth/Login";

export default function LoginPage() {
  return (
    <Site>
      <Page>
        <Form>
          <Login />
        </Form>
      </Page>
    </Site>
  );
}
