import FeaturedStudies from "../../Studies/Featured";
import Library from "../../Front/Library";
import TaskLandingMain from "../../Tasks/Landing/Main";
import StudyLandingMain from "../../Studies/Landing/Main";

export default function DiscoverMain({ query, user }) {
  const { selector, name } = query;

  if (selector === "tasks" && name) {
    return <TaskLandingMain slug={name} />;
  }

  if (selector === "studies" && name) {
    return <StudyLandingMain query={query} isDashboard />;
  }

  return (
    <>
      <FeaturedStudies user={user} isDashboard />
      <Library query={query} user={user} isDashboard />
    </>
  );
}
