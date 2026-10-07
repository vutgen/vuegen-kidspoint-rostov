// Kids Point — макет: заявка уходит в WhatsApp с заполненным текстом.
const WA_PHONE = "79185076797";

const form = document.getElementById("bookingForm");
const programSelect = document.getElementById("program");
const dateInput = document.getElementById("date");

// Минимальная дата — сегодня
dateInput.min = new Date().toISOString().slice(0, 10);

// Кнопки «Выбрать дату» в карточках подставляют программу в форму
document.querySelectorAll("[data-program]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.program;
    const option = [...programSelect.options].find((o) => o.text === value);
    if (option) programSelect.value = option.value;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const date = data.get("date")
    ? new Date(data.get("date")).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
    : "";
  const lines = [
    "Здравствуйте! Хочу забронировать праздник в Kids Point.",
    `Программа: ${data.get("program")}`,
    date && `Дата: ${date}`,
    data.get("guests") && `Гостей: ${data.get("guests")}`,
    data.get("age") && `Возраст именинника: ${data.get("age")}`,
    data.get("name") && `Меня зовут: ${data.get("name")}`,
  ].filter(Boolean);
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener");
});
