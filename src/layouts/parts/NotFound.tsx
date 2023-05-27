import Link from "@docusaurus/Link";
import IdealImage from "@theme/IdealImage";

export default function NotFound(): JSX.Element {
  return (
    <div className="text-center my-24 flex flex-col space-y-10 lg:max-w-xl max-w-xs mx-auto">
      <div>
        Your page could not be found, and neither could the design for our 404
        page. Click <Link to="/">here</Link> to go home.
      </div>
      <IdealImage img={require("../../idealimage/sad-cube.png")} />
    </div>
  );
}
