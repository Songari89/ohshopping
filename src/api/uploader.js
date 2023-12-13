export async function uploadImage(file) {
  const data = new FormData(); //form 요소를 동적으로 제어할 객체 생성
  data.append("file", file); //외부에서 file을 받아옴
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}
