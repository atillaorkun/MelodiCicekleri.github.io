document.addEventListener('DOMContentLoaded', () => {
    // Sepet Sayacı İşlevselliği
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            cartCount++;
            cartCountElement.textContent = cartCount;
            cartCountElement.classList.add('pulse');
            setTimeout(() => {
                cartCountElement.classList.remove('pulse');
            }, 500);
        });
    });

    // Otomatik Banner Değiştirme
    const banner = document.querySelector('.hero-banner');
    const bannerTitle = document.getElementById('banner-title');
    const bannerText = document.getElementById('banner-text');

    const banners = [
        {
            title: 'Hızlı ve Güvenilir Çiçek Teslimatı',
            text: 'Sevginizi anında ulaştırıyoruz.',
            image: './images/arka-pilan.jpg'
        },
        {
            title: 'Özel Günleriniz İçin En Güzel Çiçekler',
            text: 'Taze ve canlı çiçeklerle anılarınızı renklendirin.',
            image: './images/arka-pilan.jpg'
        },
        {
            title: 'Özel Tasarım Buketler',
            text: 'Size özel tasarımlarla fark yaratın.',
            image: './images/arka-pilan.jpg'
        }
    ];

    let currentBannerIndex = 0;
    function updateBanner() {
        currentBannerIndex = (currentBannerIndex + 1) % banners.length;
        banner.style.backgroundImage = `url('${banners[currentBannerIndex].image}')`;
        bannerTitle.textContent = banners[currentBannerIndex].title;
        bannerText.textContent = banners[currentBannerIndex].text;
    }
    setInterval(updateBanner, 5000); 

    // Mobil Menü İşlevselliği
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerIcons = document.querySelector('.header-icons');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        headerIcons.classList.toggle('active');
    });

    // Ürün Detay Modal'ı İşlevselliği
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalBody = document.getElementById('modal-body');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            const productImage = card.querySelector('.images-wrapper img').src;

            modalBody.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <h3>${productName}</h3>
                <p class="price">${productPrice}</p>
                <p>Bu ürün hakkında detaylı açıklama burada yer alacaktır. Ürünümüz en taze çiçeklerden özenle hazırlanmıştır ve özel günleriniz için harika bir seçenektir.</p>
                <button class="btn add-to-cart-modal">Sepete Ekle</button>
            `;
            modal.style.display = "block";
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Her bir ürün kartı için galeri işlevselliği
    productCards.forEach(card => {
        const prevButton = card.querySelector('.prev-btn');
        const nextButton = card.querySelector('.next-btn');
        const wrapper = card.querySelector('.images-wrapper');
        const totalImages = wrapper.children.length;
        let currentIndex = 0;

        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
            updateGallery();
        });

        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateGallery();
        });

        function updateGallery() {
            wrapper.style.transform = `translateX(${-currentIndex * (100 / totalImages)}%)`;
        }
    });
});
