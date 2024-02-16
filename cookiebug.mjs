import { createCookie } from "@remix-run/node";
import assert from "assert";

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

const parsedFirstCookie = await firstCookie.parse(
  response.headers.get("Set-Cookie")
);

console.log("firstCookie:", parsedFirstCookie);

const parsedSecondCookie = await secondCookie.parse(
  response.headers.get("Set-Cookie")
);

console.log("secondCookie:", parsedSecondCookie);

// Succeeds
assert.deepStrictEqual(
  parsedFirstCookie,
  { value: 1 },
  "parsedFirstCookie is not equal to { value: 1 }"
);

// Fails
assert.deepStrictEqual(
  parsedSecondCookie,
  { value: 2 },
  "parsedSecondCookie is not equal to { value: 2 }"
);
