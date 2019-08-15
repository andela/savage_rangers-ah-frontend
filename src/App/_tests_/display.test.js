import React from 'react';
import { shallow } from '../../enzyme';
import { Display, mapStateToProps } from '../Components/DisplayArticle/readArticle';
import Readreducer from '../../Redux/Reducers/readArticleReducer';

mapStateToProps({ readArticle: {} });
const match = { params: { slug: 'slug' } };
const props = {
  readArticle: jest.fn(), getTags: jest.fn(), match, tags: { data: [{ id: 1, name: 'TECH' }] }, article: { Category: { name: 'Tech' }, User: { firstName: 'Frank' } }
};
const display = shallow(<Display {...props} />);
describe('Display', () => {
  it('renders the Display component', () => {
    expect(display).toBeDefined();
    expect(display.find('div').exists()).toBe(true);
  });

  it('receive the props', () => {
    display.setState({ article: {}, tags: [], isBookmarked: true });
    display.setProps(props);
    props.match.params.slug = 'somme fdj';
  });
});

describe('test the reducers', () => {
  const initialState = { Article: {} };
  const payload = {
    article: {
      id: 6,
      title: 'What you need to know to become a great software engineer in 2020',
      description: '10 Tips to become a great software engineer by 2020.',
      body: "I get quite a few emails that basically say “how do I become a good / great software developer?”\n\nThese kinds of emails generally tick me off, because I feel like when you ask this kind of question, you are looking for some magical potion you can take that will suddenly make you into a super developer.\n\nI suspect that very few people who email me asking this question really want to know how to become a great software developer, but are instead looking for a quick fix or an easy answer.\n\nOn the other hand, I think there are some genuinely sincere developers that just don't even know how to formulate the right questions they need to ask to get to their desired future. I think those developers–especially the ones starting out–are looking for a step-by-step guide to becoming a great developer.\n\nsuper hero\n\nI thought I would make an attempt, from my experience and the best of my knowledge, to offer up that step-by-step guide.\n\nNow, of course, I realize that there is no magical formula and that there are multiple paths to success, but I think what follows is a reasonable outline of steps someone starting out could take to reach a pretty high level of proficiency and be generally regarded as a good–perhaps even great–developer.\n\nStep 1: Pick one language, learn the basics\nBefore we can run, we have to learn to walk. You walk by learning how to program in a single programming language. You don't learn to walk by trying to learn 50 million things all at once and spreading yourself way too thin.\n\nToo many beginning programmers try and jump into everything all at once and don't have the patience to learn a single programming language before moving forward. They think that they have to know all the hot new technologies in order to get a programming job. While it is true that you need to know more than just the basics of a single programming language, you have to start here, so you might as well focus.\n\nPick a single programming language that you think you would be likely to base your career around. The programming language itself doesn't matter all that much, since you should be thinking for the long term here. What I mean is you shouldn't try and learn an “easy” programming language to start. Just learn whatever language you are interested in and could see yourself programming in for the next few years. You want to pick something that will have some lasting value.\n\nOnce you've picked the programming language you are going to try and learn, try and find some books or tutorials that isolate that programming language. What I mean by this is that you don't want to find learning materials that will teach you too much all at once. You want to find beginner materials that focus on just the language, not a full technology stack.\n\nAs you read through the material or go through the tutorial you have picked out, make sure you actually write code. Do exercises if you can. Try out what you learned. Try to put things together and use every concept you learn about. Yes, this is a pain. Yes, it is easier to read a book cover-to-cover, but if you really want to learn you need to do.\n\nWhen you are writing code, try to make sure you understand what every line of code you write does. The same goes for any code you read. If you are exposed to code, slow down and make sure you understand it. Whatever you don't understand, look up. Take the time to do this and you will not feel lost and confused all the time.\n\nFinally, expect to go through a book or tutorial three times before it clicks. You will not get “programming” on the first try–no one ever does. You need repeated exposure before you start to finally get it and can understand what is going on. Until then you will feel pretty lost, that is ok, it is part of the process. Just accept it and forge ahead.\n\nStep 2: Build something small\nNow that you have a basic understanding of a single programming language, it's time to put that understanding to work and find out where your gaps are. The best way to do this is to try and build something.\n\nDon't get too ambitious at this point–but also don't be too timid. Pick an idea for an application that is simple enough that you can do it with some effort, but nothing that will take months to complete. Try to confine it to just the programming language as much as possible. Don't try to do something full stack (meaning, using all the technologies from user interfaces all the way to databases)–although you'll probably need to utilize some kind of existing framework or APIs.\n\nFor your first real project you might want to consider copying something simple that already exists. Look for a simple application, like a To-Do list app and straight out try to copy it. Don't let your design skills stand in the way of learning to code.\n\nscribbles\n\nI'd recommend creating a mobile application of some kind, since most mobile applications are small and pretty simple. Plus, learning mobile development skills is very useful as more and more companies are starting to need mobile applications. Today, you can build a mobile application in just about any language. There are many solutions that let you build an app for the different mobile OSes using a wide variety of programming languages.\n\nYou could also build a small web application, but just try to not get too deep into a complex web development stack. I generally recommend starting with a mobile app, because web development has a higher cost to entry. To develop a web application you'll need to at least know some HTML, probably some back-end framework and JavaScript.\n\nRegardless of what you choose to build, you are probably going to have to learn a little bit about some framework–this is good, just don't get too bogged down into the details. For example, you can write a pretty simple Android application without having to really know a lot about all of the Android APIs and how Android works, just by following some simple tutorials. Just don't waste too much time trying to learn everything about a framework. Learn what you need to know to get your project done. You can learn the details later.\n\nOh, and this is supposed to be difficult. That is how you learn. You struggle to figure out how to do something, then you find the answer. Don't skip this step. You'll never reach a point as a software developer where you don't have to learn things on the spot and figure things out as you go along. This is good training for your future.\n\nStep 3: Learn a framework\nNow it's time to actually focus on a framework. By now you should have a decent grasp of at least one programming language and have some experience working with a framework for mobile or web applications.\n\nPick a single framework to learn that will allow you to be productive in some environment. What kind of framework you choose to learn will be based on what kind of developer you want to become. If you want to be a web developer, you'll want to learn a web development framework for whatever programming language you are programming in. If you want to become a mobile developer, you'll need to learn a mobile os and the framework that goes with it.\n\nTry to go deep with your knowledge of the framework. This will take time, but invest the time to learn whatever framework you are using well. Don't try to learn multiple frameworks right now–it will only split your focus. Think about learning the skills you need for a very specific job that you will get that will use that framework and the programming language you are learning. You can always expand your skills later.\n\nStep 4: Learn a database technology\nMost software developers will need to know some database technology as most series applications have a back-end database. So, make sure you do not neglect investing in this area.\n\nYou will probably see the biggest benefit if you learn SQL–even if you plan on working with NoSQL database like MongoDB or Raven, learning SQL will give you a better base to work from. There are many more jobs out there that require knowledge of SQL than NoSQL.\n\nDon't worry so much about the flavor of SQL. The different SQL technologies are similar enough that you shouldn't have a problem switching between them if you know the basics of one SQL technology. Just make sure you learn the basics about tables, queries, and other common database operations.\n\nI'd recommend getting a good book on the SQL technology of your choice and creating a few small sample projects, so you can practice what you are learning–always practice what you are learning.\n\nYou have sufficient knowledge of SQL when you can:\n\nCreate tables\nPerform basics queries\nJoin tables together to get data\nUnderstand the basics of how indexes work\nInsert, update and delete data\nIn addition, you will want to learn some kind of object relational mapping technology (ORM). Which one you learn will depend on what technology stack you are working with. Look for ORM technologies that fit the framework you have learned. There might be a few options, so you best bet is to try to pick the most popular one.\n\nStep 5: Get a job supporting an existing system\nOk, now you have enough skills and knowledge to get a basic job as a software developer. If you could show me that you understand the basics of a programming language, can work wi\nPour your heart into this job. Learn everything you can. Do the best work possible. Don't think about money, raises and playing political games–all that comes later–for now, just focus on getting as much meaningful productive work done as possible and expanding your skills.\n\nStep 6: Learan to do it.\n\nPick a project that will use the full stack of your skills. Make su",
      slug: 'what-you-need-to-know-to-become-a-great-software-engineer-in-2020-nfovo9fghng',
      readTime: 6,
      coverImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565787533/rvkmbae3pcqhgysxoqnk.jpg',
      author: 42,
      category: 4,
      isBlocked: false,
      status: 'published',
      createdAt: '2019-08-14T12:58:54.185Z',
      updatedAt: '2019-08-16T09:19:39.885Z',
      deletedAt: null,
      Category: { name: 'TECHNOLOGY' },
      User: {
        username: 'MCFrank16',
        firstName: 'Frank',
        lastName: 'Mutabazi',
        profileImage: 'https://res.cloudinary.com/al-tech/image/upload/v1565805494/nenxg6yetjfgbk96iq8l.jpg'
      }
    }
  };

  const tagPayload = {
    tags: {
      status: 200,
      data: [
        {
          id: 4,
          name: 'Software',
          createdAt: '2019-08-14T12:56:55.150Z',
          updatedAt: '2019-08-14T12:56:55.150Z'
        },
        {
          id: 6,
          name: 'Growing',
          createdAt: '2019-08-14T12:56:55.152Z',
          updatedAt: '2019-08-14T12:56:55.152Z'
        },
        {
          id: 5,
          name: 'Engineering',
          createdAt: '2019-08-14T12:56:55.151Z',
          updatedAt: '2019-08-14T12:56:55.151Z'
        }
      ]
    }
  };
  it('should handle the read article action result', () => {
    expect(Readreducer(initialState, {
      type: 'READ_ARTICLE',
      payload
    })).toEqual({
      Article: {},
      article: { ...payload }
    });
  });

  it('should handle the get tags by article action result', () => {
    expect(Readreducer(initialState, {
      type: 'GET_ARTICLE_TAGS',
      payload: tagPayload
    })).toEqual({
      Article: {},
      tags: { ...tagPayload }
    });
  });
});
