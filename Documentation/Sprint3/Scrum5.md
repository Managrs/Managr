# Scrum 5

# Objectives

1. Add search bar to main dashboard  
2. Filter search results by price  
3. Improve overall search performance  

## Add search bar to main dashboard

A global search bar was introduced in the top navbar for logged-in users.

- Allows search by job title, description, and tags.
- Auto-focus and suggestion dropdown for better UX.

## Filter search results by price

Users can now input a min and max price range.

- Query parameters added to backend search route.
- Filters are designed to be applied instantly when user changes the range.
- The search button is present but not fully functional yet; applying filters depends on dynamic input rather than button submission.

## Improve overall search performance

Optimized search by indexing key fields.

- MongoDB compound index created for title + price.
- Backend debouncing to prevent query overload on fast typing.

## Evidence
![Scrum Picture](5th.jpg)
