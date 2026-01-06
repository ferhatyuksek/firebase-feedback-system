import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { firebaseConfig } from "./config.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const send = document.querySelector("#send");

runEvent();
function runEvent() {
  send.addEventListener("click", feedBack);
  const okBtn = document.getElementById("okClick");
  if (okBtn) {
    okBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (window.history <=1) {
        window.location.href = "index.html";
      } else {
        window.history.back();
      }
    });
  }
}

async function feedBack() {
  const category = document.querySelector('input[name="type"]:checked');
  const message = document.querySelector("#message").value;
  const score = document.querySelector("#score").value;
  const nameInput = document.querySelector("#userName").value;
  const isAnonim = document.querySelector("#anonimCheck").checked;
  let anonimName;

  if (isAnonim === true) {
    anonimName = "Gizli Kullanıcı";
  } else if (nameInput.trim() === "") {
    anonimName = "İsimsiz Kullanıcı";
  } else {
    anonimName = nameInput;
  }

  if (!category) {
    alert("Lütfen bir kategori seçin!");
    return;
  }
  if (message.trim() === "") {
    alert("Lütfen bir mesaj yazın");
    return;
  }

  const categoryValue = category.value;

  try {
    await addDoc(collection(db, "feedback"), {
      kategori: categoryValue,
      mesaj: message,
      puan: Number(score),
      isim: anonimName,
      tarih: serverTimestamp(),
    });
    alert("Geri bildiriminiz başarıyla gönderildi!. Teşekkür Ederiz");

    document.querySelector("#message").value = "";
    document.querySelector("#userName").value = "";
    document.querySelector("#score").value = 5;
    document.querySelector("#anonimCheck").checked = false;
    category.checked = false;
  } catch (err) {
    console.error("Hata oluştu", err);
  }
}
