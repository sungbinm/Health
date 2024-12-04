document.getElementById('menuForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const menuName = document.getElementById('menuName').value.trim();
  const menuDescription = document.getElementById('menuDescription').value.trim();
  const menuImage = document.getElementById('menuImage').files[0];
  const menuIngredientsInput = document.getElementById('menuIngredients').value.trim();
  const menuRecipe = document.getElementById('menuRecipe').value.trim(); // 레시피 입력값 가져오기

  // 재료 입력 유효성 검사
  if (!menuIngredientsInput) {
      alert('재료를 입력해주세요.');
      return;
  }

  // 레시피 입력 유효성 검사
  if (!menuRecipe) {
      alert('레시피를 입력해주세요.');
      return;
  }

  // 재료를 콤마로 구분하여 배열로 변환
  const menuIngredients = menuIngredientsInput.split(',')
      .map(ingredient => ingredient.trim().toLowerCase()) // 각 재료의 공백 제거 및 소문자 변환
      .filter(ingredient => ingredient !== ''); // 빈 문자열 제거

  if (menuIngredients.length === 0) {
      alert('유효한 재료를 입력해주세요.');
      return;
  }

  if (menuImage && category) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const imgSrc = e.target.result;

          const newMenu = {
              name: menuName,
              description: menuDescription,
              image: imgSrc,
              category: category,
              views: 0, // 초기 조회수 0으로 설정
              createdAt: Date.now(), // 현재 시간을 밀리초로 저장
              ingredients: menuIngredients, // 재료 배열 저장
              recipe: menuRecipe // 레시피 저장
          };

          const savedMenus = JSON.parse(localStorage.getItem('menus')) || [];
          savedMenus.push(newMenu);
          localStorage.setItem('menus', JSON.stringify(savedMenus));

          alert('메뉴가 추가되었습니다.');

          // 리다이렉트 URL을 수정합니다.
          const redirectUrl = `${category}.html`;
          console.log('리다이렉트 URL:', redirectUrl); // 디버깅: 올바른 URL 출력
          window.location.href = redirectUrl;
      }
      reader.readAsDataURL(menuImage);
  } else {
      alert('메뉴 이미지 또는 카테고리 정보가 없습니다.');
  }
});
