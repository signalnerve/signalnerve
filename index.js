import marked from "marked";
import template from './template'

addEventListener("fetch", event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  try {
    const text = await (
      await fetch(
        `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${GITHUB_USERNAME}/README.md`
      )
    ).text();
    const body = template(marked(text))
    return new Response(body, {
      headers: { "Content-type": "text/html" }
    });
  } catch (err) {
    return new Response(err.toString());
  }
}

