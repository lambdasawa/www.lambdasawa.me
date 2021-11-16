import marked from "marked";

export function init() {
  marked.use({
    renderer: {
      heading(text, level, raw) {
        const prefix = "#".repeat(level) + " ";
        const id = encodeURIComponent(raw);
        return `
        <h${level} id="${id}">
          <a href="#${id}">${prefix}</a>
          <span>${text}</span>
        </h${level}>
      `;
      },
    },
  });
}
