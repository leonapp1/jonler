
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-gray-600">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Jonler. All rights reserved.</p>
      </div>
    </footer>
  );
}