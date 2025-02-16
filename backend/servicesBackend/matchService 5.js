const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
});

async function matchUserWithVolunteer(user, volunteer) {
  const prompt = `
    You are an AI matchmaker for elderly care services. 
    Match an elderly person with a volunteer based on:
    - Interests: ${user.interests.join(', ')}
    - Location: ${user.location}
    - Availability: ${user.availability.join(', ')}
    - Age: ${user.age}

    The volunteer details:
    - Interests: ${volunteer.interests.join(', ')}
    - Location: ${volunteer.location}
    - Availability: ${volunteer.availability.join(', ')}
    - Skills: ${volunteer.skills.join(', ')}

    Return a JSON object: { "matchScore": 0-100, "reason": "..." }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  return JSON.parse(response.choices[0].message.content);
}

async function matchUserWithPet(user, pet) {
  const prompt = `
    You are an AI that matches therapy pets with elderly individuals.
    Match a pet based on:
    - Location: ${user.location}
    - Availability: ${user.availability.join(', ')}
    - Allergies: ${user.allergies ? user.allergies.join(', ') : "None"}
    - Pet Type Preference: ${user.petPreference || "Any"}

    Pet details:
    - Name: ${pet.name}
    - Type: ${pet.type}
    - Breed: ${pet.breed}
    - Location: ${pet.location}
    - Availability: ${pet.availability.join(', ')}
    - Allergies: ${pet.allergies.join(', ')}

    Return a JSON object: { "matchScore": 0-100, "reason": "..." }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.7,
    max_tokens: 100,
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { matchUserWithVolunteer, matchUserWithPet };
