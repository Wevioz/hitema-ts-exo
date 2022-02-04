interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adresse: Adresse;
  phone: string;
  website: string;
  company: Company;
}
interface Adresse {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: number };
}
interface Company {
  name: string;
  catchPrase: string;
  bs: string;
}
interface Article {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface ArticleUser {
  user: User;
  articles: Article[];
}

const data: ArticleUser[] = [];

document.addEventListener('DOMContentLoaded', async () => {
  const reponseUsers = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const usersFetched = (await reponseUsers.json()) as Array<User>;

  const reponseArticle = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const articleFetched = (await reponseArticle.json()) as Array<Article>;
  
  for (const user of usersFetched) {
    let articlesAssociated = articleFetched.filter(
      (article) => user.id === article.userId
    );
    if (!articlesAssociated) continue;
    let articleUser: ArticleUser = { articles: articlesAssociated, user: user };
    data.push(articleUser);
  }

  render(data);
});

function render(data: ArticleUser[]) {
  let html = '';
  data.forEach((articleJoined) => {
    html += `
    <div class="col-sm-2">
    <h3 class="text-info">${articleJoined.user.name}</h3>
    <p>${articleJoined.user.email}</p>
    <h3 class="text-warning">Titre des articles Rédigés </h3>
    <ul>
    ${articleJoined.articles.map((article) => {
      return `<li>${article.title}</li>`;
    })}
    </ul>
</div>
        `;
  });
  document.querySelector('#content')!.innerHTML = html;
}

document.querySelector('form')!.addEventListener('submit', (e: Event) => {

  e.preventDefault();

  const inputAuthor = document.querySelector('#author') as HTMLInputElement;
  const inputTitle = document.querySelector('#title') as HTMLInputElement;

  let newData: ArticleUser[] = [...data];
  if (inputAuthor.value) {
    newData = data.filter((dataArticle) =>
      dataArticle.user.name.includes(inputAuthor.value)
    );
  }

  if (inputTitle.value) {
    newData = data.filter((dataArticle) =>
      dataArticle.articles.some((article) =>
        article.title.includes(inputTitle.value)
      )
    );
  }

  render(newData);
});
