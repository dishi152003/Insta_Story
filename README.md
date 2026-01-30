24 Hours story feature(instagram like) using react + Vite  and CSS

Features included:

- **Add Story**: One can add the story by selecting the image from the device for which use file reader function .
-> As,directed the image selected needs to converted into base 64 format for that used function as: resizeAndConvertToBase64(file);
- 
- **24-Hour Expiry**: Stories automatically will be removed in 24 hrs for which used timestamp function as: TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
        return parsed.filter(story => (NOW - story.timestamp) < TWENTY_FOUR_HOURS);

- **Story Viewing**: For viewing the story as previous and next simply used the array index counter mechanism
As: const goNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {

        }
    };

**Progress bar**:
Used ternary operator  logic which sets the width of a progress bar element based on its index relative to a currentIndex. 
