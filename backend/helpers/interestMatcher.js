const similarInterestsMap = {
    "painting": ["drawing", "art", "sketching", "illustration"],
    "drawing": ["painting", "art", "sketching", "illustration"],
    "reading": ["books", "literature", "novels", "stories"],
    "music": ["singing", "instrument", "guitar", "piano", "orchestra"],
    "gardening": ["plants", "nature", "flowers", "landscaping"],
    "cooking": ["baking", "food", "culinary", "gourmet"],
    "exercise": ["yoga", "pilates", "fitness", "gym", "sports"],
    "hiking": ["nature", "outdoors", "trekking", "adventure"],
    "technology": ["computers", "programming", "AI", "robotics"],
    "movies": ["cinema", "films", "theater", "acting"],
    "animals": ["pets", "wildlife", "veterinary", "nature"],
    "volunteering": ["community service", "charity", "helping others"],
    "crafts": ["DIY", "knitting", "sewing", "woodworking"],
    "history": ["museums", "archeology", "historical sites", "antiques"],
    "science": ["space", "biology", "chemistry", "physics"],
    "photography": ["camera", "videography", "editing", "digital art"],
    "dancing": ["ballet", "hip-hop", "salsa", "jazz"],
    "writing": ["poetry", "journaling", "storytelling", "essays"]
  };
  
  /**
   * Function to check if two interests are similar.
   * @param {string} interest1 - First interest.
   * @param {string} interest2 - Second interest.
   * @returns {boolean} - True if similar, else false.
   */
  function areInterestsSimilar(interest1, interest2) {
    const normalizedInterest1 = interest1.toLowerCase();
    const normalizedInterest2 = interest2.toLowerCase();
  
    if (normalizedInterest1 === normalizedInterest2) {
      return true; // Exact match
    }
  
    // Check if one interest is in the similar list of the other
    return (
      (similarInterestsMap[normalizedInterest1] && similarInterestsMap[normalizedInterest1].includes(normalizedInterest2)) ||
      (similarInterestsMap[normalizedInterest2] && similarInterestsMap[normalizedInterest2].includes(normalizedInterest1))
    );
  }
  
  module.exports = { areInterestsSimilar };
  