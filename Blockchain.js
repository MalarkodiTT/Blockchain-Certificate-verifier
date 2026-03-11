// Virtual Blockchain Ledger (Local memory-la store aagum)
let blockchainLedger = [];

// Handle File Name Display
document.getElementById('registerInput').addEventListener('change', function() {
    document.getElementById('regFileName').innerText = this.files[0].name;
});

document.getElementById('verifyInput').addEventListener('change', function() {
    document.getElementById('verFileName').innerText = this.files[0].name;
});

// Function to calculate SHA-256 Hash
async function calculateHash(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(e.target.result)).toString();
            resolve(hash);
        };
        reader.readAsArrayBuffer(file);
    });
}

// 1. REGISTER LOGIC
async function registerCertificate() {
    const file = document.getElementById('registerInput').files[0];
    if (!file) return alert("Please select a PDF to register!");

    const hash = await calculateHash(file);
    
    if (blockchainLedger.includes(hash)) {
        alert("This certificate is already registered!");
    } else {
        blockchainLedger.push(hash);
        alert("Success! Certificate hash registered on local blockchain.");
        console.log("Current Ledger:", blockchainLedger);
    }
}

// 2. VERIFY LOGIC
async function verifyCertificate() {
    const file = document.getElementById('verifyInput').files[0];
    if (!file) return alert("Please select a PDF to verify!");

    const hash = await calculateHash(file);
    const resultBox = document.getElementById('result');
    const statusText = document.getElementById('statusText');
    const hashText = document.getElementById('hashText');

    resultBox.classList.remove('hidden', 'valid', 'invalid');

    if (blockchainLedger.includes(hash)) {
        resultBox.classList.add('valid');
        statusText.innerText = "✅ AUTHENTIC DOCUMENT";
    } else {
        resultBox.classList.add('invalid');
        statusText.innerText = "❌ TAMPERED / INVALID";
    }
    hashText.innerText = "Hash: " + hash;
}