const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lauracoombs:B1383l71883@cluster1-hk1wl.mongodb.net/test?retryWrites=true')
    .then(() => console.log('Connected to MongoDB...'))//use debug module
    .catch(err => console.error('Could not connect to MongoDB...', err));
    //config file use config file
    // mongodbcompass B1383l71883%

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);//get a 'Course' class 

async function createCourse() {
const course = new Course({//course lowercase is object
    name:'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}

async function getCourses() {
    // eq ( equal )
    // ne ( not equal )
    // gt ( greater than )
    // gte ( greater than or equal to )
    // lt ( less than )
    // lte ( less than or equal to )
    // in
    // nin ( not in ) 

    // const courses = await Course.find();
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true })//{}setting a filter in the params
        // .find({ price: { $gte: 10, $lte: 20 } })//replace value with conceptual object
        // .find({ price: { $in: [10, 15, 20] } })
        .find()
        .or([ {author: 'Mosh'}, { isPublished: true } ])//find one or other
        .and([ ])
        //starts with Mosh
        .find({ author: /^Mosh/ })//expression /pattern/ /^ /
        //Ends with Hamedani
        .find({ author: /Hamedani$/ })//  /pattern$/(i) i is optional means case sensitive
        //contains mosh
        .find ({ author: /.*Mosh.*/ })// can have 0 or more characters before or after
        .limit(10)
        .sort({ name: 1 })//or ({ name: -1 }) for backward sorted order
        // .select({ name: 1, tags: 1 });
        .count(); //instead of select to get the # instead of the list of
    console.log(courses);
}

getCourses();

//get the documents of a given page
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();