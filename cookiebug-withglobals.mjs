import { installGlobals } from "@remix-run/node";

installGlobals();

import { createCookie } from "@remix-run/node";

const firstCookie = createCookie("firstCookie", {
  httpOnly: true,
});

const secondCookie = createCookie("secondCookie", {
  httpOnly: true,
});

const headers = new Headers();
headers.append("Set-Cookie", await firstCookie.serialize({ value: 1 }));
headers.append("Set-Cookie", await secondCookie.serialize({ value: 2 }));

const response = new Response("{}", { headers });

console.log("cookie val:", response.headers.get("Set-Cookie"));

console.log(
  "firstCookie:",
  await firstCookie.parse(response.headers.get("Set-Cookie"))
);

console.log(
  "secondCookie:",
  await secondCookie.parse(response.headers.get("Set-Cookie"))
);
