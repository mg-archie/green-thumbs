export const getSavedPlantIds = () => {
    const savedPlantsIds = localStorage.getItem('saved_plants')
      ? JSON.parse(localStorage.getItem('saved_plants'))
      : [];
  
    return savedPlantsIds;
  };
  
  export const savePlantIds = (plantIdArr) => {
    if (plantIdArr.length) {
      localStorage.setItem('saved_plants', JSON.stringify(plantIdArr));
    } else {
      localStorage.removeItem('saved_plants');
    }
  };
  
  export const removePlantId = (plantId) => {
    const savedPlantIds = localStorage.getItem('saved_plants')
      ? JSON.parse(localStorage.getItem('saved_plants'))
      : null;
  
    if (!savedPlantIds) {
      return false;
    }
  
    const updatedSavedPlantIds = savedPlantIds?.filter((savedPlantId) => savedPlantId !== plantId);
    localStorage.setItem('saved_plants', JSON.stringify(updatedSavedPlantIds));
  
    return true;
  };

  export const removeBlogId = (blogId) => {
    const savedBlogIds = localStorage.getItem('saved_blogs')
      ? JSON.parse(localStorage.getItem('saved_blogs'))
      : null;
  
    if (!savedBlogIds) {
      return false;
    }
  
    const updatedSavedBlogIds = savedBlogIds?.filter((savedBlogId) => savedBlogId !== blogId);
    localStorage.setItem('saved_blogs', JSON.stringify(updatedSavedBlogIds));
  
    return true;
  };
  