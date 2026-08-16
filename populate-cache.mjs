const breeds = {
  dog: ['golden-retriever', 'labrador-retriever', 'german-shepherd', 'pug', 'beagle', 'shih-tzu', 'rottweiler'],
  cat: ['persian', 'siamese', 'maine-coon', 'bengal', 'british-shorthair', 'ragdoll'],
  rabbit: ['holland-lop', 'netherland-dwarf', 'lionhead'],
  bird: ['parakeet', 'cockatiel', 'parrot', 'macaw'],
};

const lifeStages = {
  dog: ['puppy', 'adult', 'senior'],
  cat: ['kitten', 'adult', 'senior'],
  rabbit: ['baby', 'adult', 'senior'],
  bird: ['baby', 'adult', 'senior'],
};

async function populate() {
  console.log("Starting cache population...");
  
  // We'll process them sequentially with a small delay to avoid overwhelming the APIs or hitting rate limits
  for (const [animal, animalBreeds] of Object.entries(breeds)) {
    const stages = lifeStages[animal];
    
    // First, populate the generic animal (without breed)
    for (const stage of stages) {
      console.log(`Fetching generic ${animal} - ${stage}`);
      try {
        const url = `http://localhost:3000/api/pet-food/search?animal=${animal}&lifeStage=${stage}`;
        const res = await fetch(url);
        console.log(` -> Status: ${res.status}`);
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(` -> Error:`, err);
      }
    }
    
    // Then populate for each breed
    for (const breed of animalBreeds) {
      for (const stage of stages) {
        console.log(`Fetching ${animal} - ${breed} - ${stage}`);
        try {
          const url = `http://localhost:3000/api/pet-food/search?animal=${animal}&breed=${breed}&lifeStage=${stage}`;
          const res = await fetch(url);
          console.log(` -> Status: ${res.status}`);
          await new Promise(r => setTimeout(r, 1500)); // Be gentle on rate limits
        } catch (err) {
          console.error(` -> Error:`, err);
        }
      }
    }
  }
  
  console.log("Cache population complete.");
}

populate();
