export const sanitizeContent = (content) =>
    content
        .replace("&nbsp;", " ")
        .replace(/ +/g, " ")
        .replaceAll("<div><br></div>", "\n")
        .replaceAll("<div>", "\n")
        .replaceAll("</div>", "");
