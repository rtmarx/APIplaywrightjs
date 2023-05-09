import {expect, test} from '@playwright/test'

test('update first post', async({request}) =>{
    const response = await request.put('/posts/1', {
        data: {
            id:1,
            title: 'Existing post',
            body:   'This is a post',
            userId: 1
        }

    })
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.objectContaining( {
        body:'This is a post',
        title:'Existing post',
        id:1,
        userId: 1
    }))
})

test('update a user post that does not exit', async({request})=> {
    const response = await request.put('/posts/200',{
        data:{
            id:1,
            userId:1,
            title:  'Existing post edits',
            body:   'Made changes to this post'
        }
    })
    expect(response.status()).toBe(500)
    expect(response.ok()).toBeFalsy()
    expect(response.statusText()).toEqual('Internal Server Error')
    expect(await response.text()).toContain("Cannot read properties of undefined (reading 'id')")
    }
)

