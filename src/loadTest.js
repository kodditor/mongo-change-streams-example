import { post } from "k6/http";

const baseUrl = 'http://localhost:3000'

export default function(){
  const res = post(`${baseUrl}/graphql`, 
    JSON.stringify({ 
      query:  `mutation createNewAuthor { createAuthor(authorName: "Kwabena-${Math.random() * 100000}") }`
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  console.log(res.body);
}





