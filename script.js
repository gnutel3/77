// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const id = this.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    });
});

// Валидация формы
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    if (!email.includes("@")) {
        document.getElementById("formStatus").textContent = "Введите корректный email!";
        return;
    }

    document.getElementById("formStatus").textContent = "Сообщение успешно отправлено!";
    this.reset();
});
