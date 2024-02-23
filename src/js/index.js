"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const wrap = document.querySelector(".game-wrap"),
        item = document.querySelectorAll(".item"),
        btn = document.querySelector(".btn"),
        overlay = document.querySelector(".overlay"),
        overlayClose = document.querySelector(".overlay__close"),
        text = document.querySelector(".text");

    // технические элементы
    let addArr = [];
    const globalArr = ["o", "x"];
    const arrItem = [...item];
    let c = [];
    //перезагрузка
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        item.forEach((item) => {
            item.textContent = "";
            if (item.classList.contains("item_active")) {
                item.classList.remove("item_active");
            }
        });
        addArr = [];
        c = [];
        addtext(arrItem);
    });
    //выбор полей
    wrap.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        if (target && target.classList.contains("item")) {
            item.forEach((item) => {
                if (target == item) {
                    function addClass() {
                        if (!item.classList.contains("item_active")) {
                            item.classList.add("item_active");
                        }
                    }
                    addClass();

                    addArr.push(item.textContent);
                    wins();
                }
            });
        }
    });
    // функция для показа победителя
    function wins() {
        let str = "";

        for (let i = 0; i < addArr.length; i++) {
            str += addArr[i];
        }
        if (str.length === 3 && str === "ooo") {
            setTimeout(function alrt() {
                text.textContent = ` победил игрок ${str.slice(0, 1)}`;
                overlay.classList.add("overlay_active");
            }, 500);
        } else if (str.length === 3 && str === "xxx") {
            setTimeout(function alrt() {
                text.textContent = ` победил игрок ${str.slice(0, 1)}`;
                overlay.classList.add("overlay_active");
            }, 500);
        }
    }
    wins();

    //рандомные числа от 0 до 1 для добавление фигурок в поля
    function xO(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }
    //рандомные числа и функция для рандомного выбора полей
    function randomNum(min, max) {
        let n = Math.round(min + Math.random() * (max - min));
        if (!c.includes(n)) {
            arrItem[n].textContent = globalArr[xO(0, 1)];
            c.push(n);
        }
    }
    // цикличное повторение функции randomNum для получения всех нужных чисел
    function addtext(arrItem) {
        for (let i = 0; i < arrItem.length; i++) {
            for (let x = 1; x < 9; x++) {
                randomNum(0, 8);
            }
        }
    }
    //закрытие модального окна
    overlayClose.addEventListener("click", (event) => {
        overlay.classList.remove("overlay_active");
    });

    function defaultText() {
        addtext(arrItem);
    }
    defaultText();
});
