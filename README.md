# Book App

**Author**: Carly Dekock and Glenn Clark
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Book application that you can search for new books by title or author. You can save books to your bookshelf. In the bookshelf, you can view more details, edit details, and remove books from the bookshelf.

## Getting Started
- npm install
- DATABASE_URL
- ```psql -d books_app -f data/books.sql```
- ```psql -d books_app -f data/seed.sql```

## Architecture
Languages: HTML, CSS, JavaScript
Libraries: jQuery, express, dotenv, superagent, pg, method-override

## Change Log

01-25-21 6 pm - Application has fully-functional express server, with GET and POST routes for the book resource.
01-25-21 8:30 pm - Application has fully-functional Google books API
01-25-21 8:40 pm - Application has functioning error message.
01-26-21 6pm - Application has all saved books displayed to home page
01-26-21 8pm - Application has ablity to view more details about specified book
01-26-21 9:15pm - Application has ability to save new books to bookshelf
01-27-21 5pm - Application has ability to delete a book from the bookshelf
01-27-21 7:30pm - Application has ability to update details of book from bookshelf

## Credits and Collaborations
- Chance Harmon (TA)
- Skyler (TA)
- Paul O'Brien (TA)
- Aaron (TA)
- Ron Dunphy (TA)
- Jan 26: Paul (TA) helped with SQL database grabbing id with returning command
- Jan 27: Chance (TA) helped with form for update details to set hidden and view when button clicked

## Time Estimate

### Lab 11
- Number and name of feature: 1 - Initial Setup
  - Estimate of time needed to complete: 1 hour
  - Start time: 3:15
  - Finish time: 4:30
  - Actual time needed to complete: 1 hour 15 minutes
- Number and name of feature: 2 Form Creation
  - Estimate of time needed to complete: 30 minutes
  - Start time: 4:30
  - Finish time: 5:30
  - Actual time needed to complete: 1 hour
- Number and name of feature: 3 - Browsing Results
  - Estimate of time needed to complete: 1 hour
  - Start time: 6:00pm
  - Finish time: 8:30pm
  - Actual time needed to complete: 2 hours 30 minutes
- Number and name of feature: 4 - Error Message
  - Estimate of time needed to complete: 10 minutes
  - Start time: 8:30pm
  - Finish time: 8:40pm
  - Actual time needed to complete: 10 minutes
- Number and name of feature: 5 Styling
  - Estimate of time needed to complete: 1 hour
  - Start time: 9 pm
  - Finish time: 9:58 pm
  - Actual time needed to complete: 58 minutes
- Number and name of feature: 6 - Homepage
  - Estimate of time needed to complete: 15 minutes
  - Start time: 9:58pm
  - Finish time: 10 pm
  - Actual time needed to complete: 2 minutes

### Lab 12
- Number and name of feature: 1 Database and Homepage
  - Estimate of time needed to complete: 1 hour
  - Start time: 3 pm
  - Finish time: 6:00 pm
  - Actual time needed to complete: 3 hours
- Number and name of feature: 2 Book Details
  - Estimate of time needed to complete: 1 hour
  - Start time: 6:15pm
  - Finish time: 8:00pm
  - Actual time needed to complete: 1 hour and 45 minutes
- Number and name of feature: 3 Save Books
  - Estimate of time needed to complete: 1 hour
  - Start time: 8:10pm
  - Finish time: 9:15pm
  - Actual time needed to complete: 1 hour 5 minutes
- Number and name of feature: 4 Layout
  - Estimate of time needed to complete: 30 minutes
  - Start time: 2:00pm - 1/27
  - Finish time: 2:30pm - 1/27
  - Actual time needed to complete:
- Number and name of feature: 5 Modules
  - Estimate of time needed to complete: 30 minutes
  - Start time: 2:30pm - 1/27
  - Finish time: 3:30pm - 1/27
  - Actual time needed to complete:

### Lab 13
- Number and name of feature: 1 Update Book Details
  - Estimate of time needed to complete: 1 hour
  - Start time: 5:00pm
  - Finish time: 7:30pm
  - Actual time needed to complete: 2 hours 30 minutes
- Number and name of feature: 2 Remove Books
  - Estimate of time needed to complete: 1 hour
  - Start time: 4:15pm
  - Finish time: 5:00pm
  - Actual time needed to complete: 45 minutes
