let goal = Number(localStorage.getItem("goal")) || 3000;
let total = Number(localStorage.getItem("water")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("date");

let today = new Date().toLocaleDateString();

// Daily reset
if (lastDate !== today) {
    if (total >= goal) {
        streak++;
    } else {
        streak = 0;
    }

    total = 0;
    localStorage.setItem("streak", streak);
    localStorage.setItem("water", total);
    localStorage.setItem("date", today);
}

// Add water
function addWater(amount) {
    total += amount;
    localStorage.setItem("water", total);

    playSound();
    checkAchievement();
    updateUI();
}

// Achievements system 🏆
function checkAchievement() {
    let badge = "🏆 Beginner";

    if (streak >= 3) badge = "🥉 Bronze Hydrator";
    if (streak >= 7) badge = "🥈 Silver Hydrator";
    if (streak >= 15) badge = "🥇 Gold Hydrator";

    document.getElementById("badgeText").innerText = badge;
}

// Set goal
function setGoal() {
    let input = document.getElementById("goalInput").value;
    if (input > 0) {
        goal = input;
        localStorage.setItem("goal", goal);
        updateUI();
    }
}

// Reset
function resetWater() {
    total = 0;
    localStorage.setItem("water", total);
    updateUI();
}

// Update UI
function updateUI() {
    document.getElementById("progressText").innerText =
        `${total} / ${goal} ml`;

    let percent = Math.min((total / goal) * 100, 100);
    document.getElementById("progressBar").style.height = percent + "%";

    document.getElementById("streakText").innerText =
        `🔥 Streak: ${streak} days`;

    if (total >= goal) {
        celebrate();
    }
}

// 🎉 Celebration animation
function celebrate() {
    alert("🎉 Goal Completed! You're amazing!");
}

// Dark mode
function toggleDark() {
    document.body.classList.toggle("dark");
}

// Sound
function playSound() {
    let audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    audio.play();
}

// Notifications
if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
}

setInterval(() => {
    if (Notification.permission === "granted") {
        new Notification("💧 Stay hydrated!");
    }
}, 3600000);

// Init
updateUI();
checkAchievement();