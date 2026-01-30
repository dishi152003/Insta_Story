import React, { useRef } from 'react';

export default function AddStoryButton({ onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large. Please select a smaller image.");
            return;
        }

        try {
            const base64 = await resizeAndConvertToBase64(file);
            onUpload(base64);
        } catch (err) {
            console.error("Error processing image", err);
            alert("Failed to process image");
        } finally {

            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const resizeAndConvertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;


                    const MAX_SIZE = 1080 *1920;
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);


                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(dataUrl);
                };
                img.onerror = reject;
                img.src = event.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="story-bubble-container" onClick={() => fileInputRef.current.click()}>
            <div className="story-ring add-ring">
                <div className="story-image-wrapper add-wrapper">
                    <span className="plus-icon">+</span>

                </div>
            </div>
            <span className="story-username">Your Story</span>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

        </div>
    );

}









































