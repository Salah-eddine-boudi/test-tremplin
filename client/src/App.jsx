import { Toaster } from 'react-hot-toast';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ContactForm />
    </>
  );
}

export default App;