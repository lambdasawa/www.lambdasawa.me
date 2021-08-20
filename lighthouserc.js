module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        "https://www.lambdasawa.me/",
        "https://www.lambdasawa.me/blogs",
        "https://www.lambdasawa.me/blogs/cheatsheet",
      ],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
