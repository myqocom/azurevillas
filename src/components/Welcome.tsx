export default function Welcome() {
  return (
    <section id="welcome" className="py-20 md:py-32 bg-sand-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-8">
          Welcome to Azzura Villas, Lefkada
        </h2>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg md:text-xl">
            These brand new villas are ideally located on an unspoilt hill with stunning sea and mountain views. 
            Surrounded by a century-old olive grove, our villas are the perfect base for you and your family 
            to enjoy the breathtaking scenery in a purely natural environment.
          </p>
          
          <div className="py-6">
            <div className="w-24 h-px bg-azure-400 mx-auto" />
          </div>
          
          <p className="text-base md:text-lg italic text-gray-500">
            Both villas are designed in an exclusive, contemporary way with natural materials 
            that adds to comfort and relaxation.
          </p>
          
          <p className="text-base md:text-lg">
            Outdoors, each house has a private infinity pool, jacuzzi and a barbeque area while 
            the glass-walled balcony allows you to enjoy, unobstructed, the spectacular views of the Ionian Sea.
          </p>
          
          <p className="text-base md:text-lg">
            Indoors, both villas are decorated with elegance and simplicity offering a spacious dining area 
            that seats 8, a comfortable living room and a fully equipped kitchen. On the ground floor, 
            there are two bedrooms with super king size beds featured with their own private en suite bathroom 
            and private balcony access. While, on the upper floor, there is a master room with a super king size bed, 
            private en suite bathroom, a walk-in closet and a spacious private balcony with jacuzzi overlooking the sea view.
          </p>
        </div>
      </div>
    </section>
  );
}
