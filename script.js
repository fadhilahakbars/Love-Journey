const reasons = [
    "Kamu selalu ada untukku kapan pun aku butuh.",
    "Cara kamu tersenyum membuat hariku jadi lebih baik.",
    "Kamu mendengarkan ceritaku walaupun kadang gak penting.",
    "Kamu sabar banget menghadapi aku yang punya sifat egois.",
    "Kamu tahu cara membuatku tertawa di saat sedih.",
    "Bersamamu aku merasa nyaman, dan tidak memiliki banyak pikiran",
    "Banyak hal yang apapun yang aku suka dan kamu juga suka",
    // Tambahkan hingga 365 alasan di sini
  ];
  
  let index = 0;
  
  function showNextReason() {
    const reasonElement = document.getElementById("reason");
      // Tambahkan efek fade-out

      if (index >= reasons.length){
        document.getElementById("main-content").classList.add("hidden");
        document.getElementById("scrapbook").classList.remove("hidden");
        return;
      }
    reasonElement.classList.add("fade-out");

    setTimeout(() => {
        reasonElement.textContent = reasons[index];
        index++;

        // Hapus fade-out untuk memicu fade-in (karena CSS akan kembali ke opacity: 1)
        reasonElement.classList.remove("fade-out");
    }, 500)
    
  }

  function showGiftBox() {
    document.getElementById("scrapbook").classList.add("hidden");
    document.getElementById("giftbox").classList.remove("hidden");
  
    const video = document.getElementById("gift-video");
    video.play().catch(err => {
      console.log("Autoplay mungkin diblokir, klik manual ya:", err);
    });
  }

  function goToWishlist() {
    document.getElementById("btn-next-from-video").addEventListener("click", () => {
        document.getElementById("giftbox").classList.add("hidden");
        document.getElementById("wishlist-form").classList.remove("hidden");
    
        const giftVideo = document.getElementById("gift-video");
        giftVideo.pause();
        giftVideo.currentTime = 0;

        // 4. Kembalikan volume musik (kalau kamu pakai fadeVolume, bisa juga)
        const bgMusic = document.getElementById("bg-music");
        bgMusic.volume = 1.0;
    
    })
    
  }
  
  function submitWishlist() {
    const input = document.getElementById("wishlist-input").value.trim();
    const lines = input.split("\n").filter(line => line.trim() !== "");
    
    const ul = document.getElementById("wishlist-output");
    ul.innerHTML = ""; // Bersihkan dulu
  
    lines.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  
    document.getElementById("wishlist-form").classList.add("hidden");
    document.getElementById("wishlist-result").classList.remove("hidden");
  }
  
  function startTour() {
    document.getElementById("cover").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");

    const music = document.getElementById("bg-music");
    music.play().catch(error => {
      console.log("Autoplay diblokir, pengguna harus interaksi dulu:", error);
    });
  }

  function showEnding() {
    document.getElementById("wishlist-result").classList.add("hidden");
    document.getElementById("ending").classList.remove("hidden");
  }

  const bgMusic = document.getElementById('bg-music');
  const giftVideo = document.getElementById('gift-video');
  
  function startMusic() {
    bgMusic.play();
    bgMusic.volume = 1.0;
  }

  function fadeVolume(audio, targetVolume, duration = 1000) {
    const step = 0.02;
    const difference = targetVolume - audio.volume;
    const direction = difference > 0 ? 1 : -1;
    const steps = Math.abs(difference / step);
    const interval = duration / steps;
  
    const fade = setInterval(() => {
      let newVolume = audio.volume + direction * step;
      newVolume = Math.max(0, Math.min(1, newVolume));
      audio.volume = newVolume;
  
      if ((direction === 1 && newVolume >= targetVolume) || (direction === -1 && newVolume <= targetVolume)) {
        audio.volume = targetVolume;
        clearInterval(fade);
      }
    }, interval);
  }

    // Saat video mulai diputar
    giftVideo.addEventListener("play", () => {
        fadeVolume(bgMusic, 0.2);
    });
    
    // Saat video dijeda
    giftVideo.addEventListener("pause", () => {
        fadeVolume(bgMusic, 1.0);
    });
    
    // Saat video selesai
    giftVideo.addEventListener("ended", () => {
        fadeVolume(bgMusic, 1.0);
    });

  function createEmoji() {
    const emojiList = ['❤️', '💖', '💫', '🌟', '💘', '🥰'];
    const emoji = document.createElement('span');
    emoji.classList.add('emoji');
    emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.top = (Math.random() * 80 + 10) + 'vh'; // supaya muncul di tengah atas
    emoji.style.fontSize = (1 + Math.random() * 2) + 'em';
    emoji.style.animationDuration = (3 + Math.random() * 2) + 's';
  
    document.getElementById('emoji-container').appendChild(emoji);
  
    // Hapus setelah animasi selesai agar tidak memberatkan DOM
    setTimeout(() => {
      emoji.remove();
    }, 5000);
  }
  
  // Jalankan terus-menerus setiap 300-500ms
  setInterval(createEmoji, 400);