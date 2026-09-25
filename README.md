# Visorix

**https://visorix.vercel.app/**

## Features

- **Comprehensive Visa Management**: Users can browse, add, update, and delete visa information with detailed specifications like processing time, fees, and required documents.
- **User Authentication**: Secure login and registration system with Google Social Login for easy access.
- **Private/Protected Routes**: Certain features are restricted to logged-in users, such as adding visas, viewing personal visa additions, and checking visa applications.
- **Interactive Design**: Includes dynamic elements like sliders, modals, dropdown filters, and search functionalities.
- **Dark/Light Theme Toggle**: Switch between themes for a personalized browsing experience.

---

## Table of Contents

1. [Data Structure](#data-structure)
2. [Website Layout Structure](#website-layout-structure)
3. [Authentication](#authentication)
4. [Home Page](#home-page)
5. [Add Visa Page](#add-visa-page)
6. [All Visas Page](#all-visas-page)
7. [Visa Details Page](#visa-details-page)
8. [My Added Visas Page](#my-added-visas-page)
9. [My Visa Applications Page](#my-visa-applications-page)
10. [Footer](#footer)
11. [Error Handling and Enhancements](#error-handling-and-enhancements)

---

## Data Structure

| Field                | Type             | Description                                                           |
| -------------------- | ---------------- | --------------------------------------------------------------------- |
| `Country Image`      | String (URL)     | Image of the country.                                                 |
| `Country Name`       | String           | Name of the country.                                                  |
| `Visa Type`          | String           | Type of visa (e.g., Tourist, Student, Official).                      |
| `Processing Time`    | String           | Time required for visa processing.                                    |
| `Required Documents` | Array of Strings | List of documents required (e.g., Passport, Photo, Application Form). |
| `Description`        | String           | Detailed description of the visa.                                     |
| `Age Restriction`    | Number           | Minimum age requirement for the visa.                                 |
| `Fee`                | Number           | Cost of the visa.                                                     |
| `Validity`           | String           | Duration of the visa validity.                                        |
| `Application Method` | String           | Instructions or process for applying for the visa.                    |

---

## Website Layout Structure

### Navbar

- **Components**: Logo/Website Name, Navigation Links (Home, All Visas, Add Visa, My Added Visas, My Visa Applications), Login/Register Buttons or User Profile (with hover displayName).
- **Behavior**: Conditional rendering based on user authentication.

### Footer

- **Content**: Website name, copyright information, contact details, and social media links.
- **Appearance**: Present on all pages except the 404 page.

---

## Authentication

### Login Page

- **Form Fields**: Email, Password, Forgot Password Link, Login Button.
- **Additional Options**: Link to Register, Google Social Login.
- **Behavior**: Redirect to desired route/home on success, show error message on failure.

### Register Page

- **Form Fields**: Name, Email, Photo URL, Password, Register Button.
- **Password Validation**: Must contain , lowercase, and be at least 6 characters long.
- **Additional Options**: Link to Login, Google Social Login.
- **Behavior**: Redirect to desired route/home on success, show error message on failure.

---

## Home Page

### Sections

1. **Navbar**
2. **Banner/Slider**: Minimum 3 slides with meaningful information.
3. **Latest Visas**: Showcase 6 newest visa cards with `See Details` button and `See All Visas` link.
4. **Extra Sections**: Two relevant and informative sections.
5. **Footer**

---

## Add Visa Page

- **Fields**:
  - Country Image (URL).
  - Country Name.
  - Visa Type (Dropdown: Tourist, Student, Official).
  - Processing Time.
  - Required Documents (Checkboxes).
  - Description.
  - Age Restriction (Number).
  - Fee (Number).
  - Validity.
  - Application Method.
- **Behavior**: Save data to the database, show success message, and add the visa to "All Visas" page.

---

## All Visas Page

- **Features**:
  - Display visas in a 4-column grid.
  - Each card includes 3-4 visa details and a `See Details` button.
  - Dropdown for filtering visas by type.
  - "See Details" navigates to the Visa Details Page.

---

## Visa Details Page

- **Private/Protected Route**: Redirect unauthenticated users to login.
- **Content**: Show all visa details and an `Apply for Visa` button.
- **Apply Modal**:
  - Fields: Email, First Name, Last Name, Current Date, Fee.
  - Behavior: Save data to the database and display on "My Visa Applications" page.

---

## My Added Visas Page

- **Private/Protected Route**: Show only visas added by the user.
- **Features**:
  - Update: Open a modal with pre-filled fields, allow edits, and save updates.
  - Delete: Remove visa from database and UI.

---

## My Visa Applications Page

- **Private/Protected Route**: Show only visas applied by the user.
- **Features**:
  - Search by Country Name.
  - Display applicant details and `Cancel` button to remove application.

---

## Error Handling and Enhancements

- **404 Page**: Display meaningful "Not Found" message.
- **Loading Spinner**: Show spinner during data load.
- **Toast Notifications**: Feedback for all CRUD operations.
- **Dark/Light Theme Toggle**.
- **Animations**: Use libraries like Lottie React and React Awesome Reveal.

---

## Installation and Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables for the backend (e.g., MongoDB, Firebase).
4. Run the development server using `npm start`.

---

## Technology Stack

- **Frontend**: React, TailwindCSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: Firebase.
- **Libraries**: React Router, Axios, Lottie React, React Awesome Reveal.

---

## License

MIT License
