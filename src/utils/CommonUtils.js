
export const convertBase64 = (e) => {
    return new Promise((resolve, reject) => {
        try {
            const imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                resolve(e.target.result)
            });

            reader.readAsDataURL(imageFile);
        } catch (err) {
            reject(err);
        }
    })
}




