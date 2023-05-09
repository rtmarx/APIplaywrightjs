import {expect, test} from '@playwright/test'

test ('create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
         data:{
             title:'New Post by user',
             body:'This is a new post by a user',
             userId:1
         }
    })
    expect(await response.status()).toBe(201)
    expect(await response.json()).toEqual((expect.objectContaining({
        "id":101,
        "title":'New Post by user',
        "body":'This is a new post by a user',
        "userId":1
    })))
})