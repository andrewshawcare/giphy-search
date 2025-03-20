import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../application-context";

interface GetHelloMessageParameters {
  origin: string;
  name: string;
}

async function getHelloMessage({ origin, name }: GetHelloMessageParameters) {
  const response = await fetch(`${origin}/hello/${name}`);
  return await response.text();
}

interface HelloProps {
  name: string;
}

export function Hello(props: HelloProps) {
  const applicationContext = useContext(ApplicationContext);
  const [helloMessage, setHelloMessage] = useState<string>();

  useEffect(() => {
    getHelloMessage({
      origin: applicationContext.api.origin,
      name: props.name,
    }).then(setHelloMessage);
  }, []);

  return <>{helloMessage}</>;
}
