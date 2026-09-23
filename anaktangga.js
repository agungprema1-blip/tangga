const WARNA = [
    { nama: "Hijau", hex: "#3bb273" },
    { nama: "Ungu", hex: "#7b4fa3" },
    { nama: "Kuning", hex: "#e3c23c" },
    { nama: "Biru", hex: "#3a7bd5" },
    { nama: "Abu", hex: "#8a8a8a" },
];

const jumlahInput = document.getElementById("jumlah");
const warnaRow = document.getElementById("warnaRow");
const stage = document.getElementById("stage");

let warnaAktif = null;

// Bangun tombol pilihan warna
WARNA.forEach(w => {
    const btn = document.createElement("button");
    btn.className = "warna-btn";
    btn.type = "button";
    btn.innerHTML = `<span class="swatch" style="background:${w.hex}"></span>${w.nama}`;
    btn.addEventListener("click", () => {
        warnaAktif = w.hex;
        document.querySelectorAll(".warna-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        buatTangga();
    });
    warnaRow.appendChild(btn);
});

function ambilJumlah() {
    let n = parseInt(jumlahInput.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 10) n = 10;
    jumlahInput.value = n;
    return n;
}

// Nested loop: baris (i) -> kolom (j) membentuk pola tangga menaik ke kanan
function buatTangga() {
    if (!warnaAktif) {
        stage.innerHTML = `<div class="empty-note">Pilih warna untuk membuat tangga…</div>`;
        return;
    }

    const n = ambilJumlah();
    const tangga = document.createElement("div");
    tangga.className = "tangga";

    for (let i = 1; i <= n; i++) {          // baris (dari atas ke bawah)
        const baris = document.createElement("div");
        baris.className = "baris";

        for (let j = 1; j <= n; j++) {        // kolom
            const kotak = document.createElement("div");
            if (j <= i) {
                kotak.className = "anak";
                kotak.style.backgroundColor = warnaAktif;
            } else {
                kotak.className = "anak kosong";
            }
            baris.appendChild(kotak);
        }
        tangga.appendChild(baris);
    }

    stage.innerHTML = "";
    stage.appendChild(tangga);
}

jumlahInput.addEventListener("input", buatTangga);
jumlahInput.addEventListener("change", ambilJumlah);