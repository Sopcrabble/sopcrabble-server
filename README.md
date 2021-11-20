# 🎀솝말잇기🎀
### 솝트인을 위한 릴레이 솝조어 생성기 , 솝말잇기
<br>

## 1. 역할 분담
#### 😎 주현: 초기 환경 세팅, API 설계, ERD 생성, API 명세서 작성
#### 😋 규원: README 작성, API 설계, ERD 생성, API 명세서 작성

<br>
<br>

## 2. 코드 컨벤션
### ****📌**** 변수명

1. **Camel Case 사용**
• lower Camel Case
2. **함수의 경우 동사+명사 사용**
• ex) getInformation()
3. **길이는 20자로 제한한다.**
• 부득이한 경우 팀원과의 상의를 거친다.
4. **flag로 사용 되는 변수는 조동사 + flag 종류로 구성**
• ex) isNum
5. **약어는 되도록 사용하지 않는다.**
<br>

### ****📌 주석****


- 한 줄 주석은 // 을 사용한다.
- 그 이상은 /** */ 을 사용한다.
- 함수 설명 주석은 /** */ 을 사용한다.
    
    ```jsx
    /**
     *  @route GET /user/:userId
     *  @desc GET one user
     *  @access Private
     */
    ```
    

<br>

### ****📌**** Bracket


```jsx
// 한줄 if 문 - 여러 줄로 작성
 if(trigger) {
   return;
 }

// 괄호 사용 한칸 띄우고 사용한다.
 if (left == true) {
    return;
 }

// 띄어쓰기
 if (a == 5) { // 양쪽 사이로 띄어쓰기
    return;  
 }
```

<br>

### ****📌 비동기 함수의 사용****


- async await 함수 사용을 지향한다.
- Promise 사용은 지양한다.

<br>

### ****📌 Database****


1. **DB 이름 (스키마)**
    - 데이터베이스 명은 영어 대문자로 구성한다.
    - 길이는 8자 이내로 구성한다.
2. **컬렉션**
    - 소문자를 사용한다
    - 's' 를 사용(ex, users profiles)
    - 컬렉션 명의 구성은 최대 3단어까지 사용할 수 있다.
    - 최대 길이는 26자 이내로 구성한다.
3. **컬럼**
    - 컬럼은 snake 표기법을 따르고, 의미있는 컬럼명_접미사 형태로 작성한다.
    - 컬럼의 성질을 나타내는 접미사를 사용한다. (사용하는 데이터의 타입을 나타내는 것이 아님에 유의)
   
 <br>

### ****📌 문자열****

- 문자열을 쓸 때는 `''` 따옴표를 사용한다.

<br>

### ****📌 스타일****

- 타입 앞에 공백을 넣는다.
    
    예) const foo: string = "hello";
    
- 세미콜론, 콜론, 컴마 뒤에는 항상 공백을 둔다.
    
    예) `for (var i = 0, n = str.length; i < 10; i++) { }`
    
- 변수는 단일 선언을 한다.
    - use `var x = 1; var y = 2;` over `var x = 1, y = 2;`
- 앞의 공백(indentation)은 스페이스 2개로 맞춘다.
- 화살표 함수
    - `(x) => x + x` (X) `x => x + x` (O)
    - `(x,y) => x + y` (O) `<T>(x: T, y: T) => x === y` (O)
   
 
<br>
<br>

## 3. 브랜치 전략
### ****🌈 Git Workflow****
### * main → develop → juhyeon_feature/#3
   main은 모든 작업이 끝난 후 develop에서 merge 시킨다.

—————————————————————————<br>
* main - 초기 세팅 존재<br>
* develop - local 작업 완료 후 merge 브랜치<br>
* juhyeon - 주현 local 브랜치<br>
* gyuwon - 규원 local 브랜치<br>
* localdevelop_feature/#issue - 각자의 기능 추가 브랜치
<br>
—————————————————————————

1. `local - feature` 에서 각자 기능 작업
2. 작업 완료 후 `remote - develop` 에 PR 후 Merge
3. 코드 리뷰 후 Confirm 받고 Merge
4. remote - develop 에 Merge 될 때 마다 **모든 팀원 remote - develop pull** 받아 최신 상태 유지

<br><br>

## 4. 프로젝트 폴더링

```markdown
|-📋 firebaserc
|-📋 firebase.json
|-📋 .gitignore
|-📁 functions_
               |- 📋 index.js
               |- 📋 package.json
               |- 📋 .gitignore
               |- 📋 .env
               |- 📁 api_ 
               |         |- 📋 index.js
               |         |- 📁 routes_
               |                      |- 📋 index.js
               |                      |- 📁 user_
               |                                 |-📋 index.js
               |                                 |-📋 userGET.js
               |
               |- 📁 config_ 
               |            |- 📋 dbConfig.js
               |
               |- 📁 constants_ 
               |               |- 📋 responseMessage.js
               |               |- 📋 statusCode.js
               |
               |- 📁 db_ 
               |        |- 📋 db.js
               |        |- 📋 index.js
               |        |- 📋 user.js
               |
               |- 📁 lib_
                         |- 📋 convertSnakeToCamel.js
                         |- 📋 util.js
               
```
