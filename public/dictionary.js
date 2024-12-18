
    // 학생 객체 배열
    let students = [
        { id: "디로딩", name: "힘들게 운동한 후 기존의 운동강도보다 약한 운동을 하거나 아예 운동을 쉬면서 그동안 쌓인 피로감을 회복하는 기간을 갖는 것" },
        { id: "근육", name: "근육입니다" },
        { id: "테스트", name: "테스트입니다" },
    ];

    // li에 데이터 출력
    for (let i = 0; i < students.length; i++) {
        document.querySelectorAll("#students li")[i].innerText = students[i].name;
    }

    // search 버튼 클릭 시 호출되는 함수
    function search() {
        // 폼에 입력된 값
        let text = document.getElementsByClassName("search-text")[0].value;

        // find() 메소드를 사용하여 값 찾기
        let res = students.find((element) => {
            return element.id === text;
        });

        // 예외 처리
        if (res !== undefined) {
            document.getElementById("result").innerText = res.name;
        } else {
            document.getElementById("result").innerText = "찾을 수 없습니다.";
        }
    }

    // 클릭 시 search 함수 호출
    document.getElementById("btn").addEventListener("click", search);
