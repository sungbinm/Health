
    // 학생 객체 배열
    let students = [
        { id: "디로딩", name: "근육, 관절, 인대, 근신경계 등 회복하기 위해 운동을 아예 쉬거나 특정 시간 기간동안 운동 강도를 평소보다 낮추어서 진행하는 것." },
        { id: "근육", name: "근육입니다" },
        { id: "덤벨", name: "덤벨입니다" },
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
