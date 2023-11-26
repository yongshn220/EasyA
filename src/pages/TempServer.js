const TPost1 = {
  id: 1,
  userId: 1,
  img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80\n",
  title: "Title 1",
  price: 14,
  description: "This is sample description, This is sample description this is sample.........",
  comments: [
    {
      id: 1,
      userId: 1,
      username: "CSE Major",
      timestamp: 0,
      text: "This is Sample Comment 1",
      replies: [
        {
          id: 1,
          userId: 1,
          username: "Author",
          timestamp: 0,
          text: "Sample Reply Comment 1"
        },
        {
          id: 1,
          userId: 1,
          username: "Commenter",
          timestamp: 0,
          text: "Sample Reply Comment 2"
        },
        {
          id: 1,
          userId: 1,
          username: "Commenter",
          timestamp: 0,
          text: "Sample Reply Comment 3"
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      username: "BUS Major",
      timestamp: 0,
      text: "This is Sample Comment 2",
      replies: [
        {
          id: 1,
          userId: 1,
          username: "Author",
          timestamp: 0,
          text: "Sample Reply Comment 1"
        },
        {
          id: 1,
          userId: 1,
          username: "Commenter",
          timestamp: 0,
          text: "Sample Reply Comment 2"
        },
        {
          id: 1,
          userId: 1,
          username: "Commenter",
          timestamp: 0,
          text: "Sample Reply Comment 3"
        }
      ]
    },
    {
      id: 3,
      userId: 3,
      username: "AMS Major",
      timestamp: 0,
      text: "This is Sample Comment 2",
      replies: []
    }
  ]
}

const TPost2 = {
  id: 2,
  userId: 2,
  img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  title: "Title 2",
  price: 14,
  description: "This is sample description, This is sample description this is sample.........",
  comments: [],
}



const TPost3 = {
  id: 3,
  userId: 3,
  img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  title: "Title 3",
  price: 14,
  description: "This is sample description, This is sample description this is sample.........",
  comments: [],
}


const TPost4 = {
  id: 4,
  userId: 4,
  img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  title: "Title 4",
  price: 14,
  description: "This is sample description, This is sample description this is sample.........",
  comments: [],
}


export const TServer = {
  postList: [TPost1, TPost2, TPost3, TPost4]
}

export const Post = {
  id: "",
  userId: "",
  img: "",
  title: "",
  price: "",
  description: "",
  comments: [
    {
      id: 1,
      userId: 1,
      timestamp: 0,
      text: "This is Sample Comment 1",
      replies: [
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 1"
        },
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 2"
        },
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 3"
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      timestamp: 0,
      text: "This is Sample Comment 2",
      replies: [
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 1"
        },
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 2"
        },
        {
          id: 1,
          userId: 1,
          timestamp: 0,
          text: "Sample Reply Comment 3"
        }
      ]
    },
    {
      id: 3,
      userId: 3,
      timestamp: 0,
      text: "This is Sample Comment 2",
      replies: []
    }
  ]
}




