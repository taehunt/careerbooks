// main.js
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // 자동 슬라이드
  setInterval(nextSlide, 4000); // 4초마다 자동 전환

  showSlide(current);
});

// 로그인/로그아웃 기능
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const welcomeBox = document.getElementById("welcomeMessage");
  const userDisplay = document.getElementById("userDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  function checkLoginStatus() {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      loginForm.style.display = "none";
      welcomeBox.style.display = "block";
      userDisplay.textContent = savedUser;
    } else {
      loginForm.style.display = "flex";
      welcomeBox.style.display = "none";
    }
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem("username", username);
      checkLoginStatus();
    }
  });

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("username");
    checkLoginStatus();
  });

  checkLoginStatus();
});

// 댓글 기능
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("commentInput");
  const commentList = document.getElementById("commentList");

  let comments = JSON.parse(localStorage.getItem("comments") || "[]");

  function renderComments() {
    commentList.innerHTML = "";
    comments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.className = "comment-item";
      li.innerHTML = `
        ${comment}
        <button onclick="editComment(${index})">수정</button>
        <button onclick="deleteComment(${index})">삭제</button>
      `;
      commentList.appendChild(li);
    });
  }

  window.editComment = function (index) {
    const newComment = prompt("댓글을 수정하세요", comments[index]);
    if (newComment !== null && newComment.trim() !== "") {
      comments[index] = newComment.trim();
      saveComments();
    }
  };

  window.deleteComment = function (index) {
    if (confirm("정말 삭제하시겠습니까?")) {
      comments.splice(index, 1);
      saveComments();
    }
  };

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newComment = commentInput.value.trim();
    if (newComment !== "") {
      comments.push(newComment);
      commentInput.value = "";
      saveComments();
    }
  });

  renderComments();
});
