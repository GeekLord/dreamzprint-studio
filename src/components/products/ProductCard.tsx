import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Image as FabricImage } from "fabric";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  selectedDesign: string | null;
  onOrder: (product: Product) => void;
}

export const ProductCard = ({ product, selectedDesign, onOrder }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: 'transparent',
    });

    // Load the product image
    FabricImage.fromURL(product.image, {
      crossOrigin: 'anonymous',
    }).then((img) => {
      // Calculate scale to fit the image within 80% of the canvas
      const scaleX = (canvas.width! * 0.8) / img.width!;
      const scaleY = (canvas.height! * 0.8) / img.height!;
      const scale = Math.min(scaleX, scaleY);
      
      img.scale(scale);

      // Center the image
      img.set({
        left: (canvas.width! - img.width! * scale) / 2,
        top: (canvas.height! - img.height! * scale) / 2,
        selectable: false,
        evented: false,
      });
      
      canvas.add(img);
      canvas.renderAll();
    }).catch(error => {
      console.error('Error loading product image:', error);
      toast.error("Error loading product image");
    });

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [product.image]);

  // Load and add design image when selected
  useEffect(() => {
    if (!fabricCanvas || !selectedDesign) return;

    // Remove any existing design images
    const existingDesigns = fabricCanvas.getObjects().filter((obj) => {
      return obj.get('customType') === 'design';
    });
    existingDesigns.forEach(obj => fabricCanvas.remove(obj));

    // Add new design image with smaller scale
    FabricImage.fromURL(selectedDesign, {
      crossOrigin: 'anonymous',
    }).then((img) => {
      const scaleFactor = 0.2; // Reduced from 0.3 to 0.2 for better visibility
      img.scale(scaleFactor);
      
      img.set({
        left: fabricCanvas.width! * 0.4, // Adjusted position
        top: fabricCanvas.height! * 0.4, // Adjusted position
        customType: 'design',
      });
      
      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      fabricCanvas.renderAll();
      toast("You can now drag and resize the design!");
    }).catch(error => {
      console.error('Error loading design:', error);
      toast.error("Error loading design image");
    });
  }, [selectedDesign, fabricCanvas]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-primary font-medium mb-4">{product.price}</p>
      
      {product.colors && (
        <div className="flex gap-2 mb-4">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-primary scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      )}
      
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>

      <Button 
        className="w-full"
        onClick={() => onOrder(product)}
      >
        {selectedDesign ? 'Order with Custom Design' : 'Create Your Design'}
      </Button>
    </div>
  );
};