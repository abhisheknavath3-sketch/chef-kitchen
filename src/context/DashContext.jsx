import { createContext, useEffect } from "react";
import { useContext, useState } from "react";

export const DashContext = createContext()

export function DashProvider({ children }) {

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [categoryProducts, setcategoryProducts] = useState([]);
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("categories");
        return saved ? JSON.parse(saved) : [];
    });
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        category: "",
        stock: "",
        sizes: {},
        orderType: [],
        image: null,
    });
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem("products");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        try {
            localStorage.setItem("products", JSON.stringify(products));
        } catch (e) {
            console.error("Storage full", e);
        }
    }, [products]);



    const [open, setOpen] = useState(false);


    const handleAddOrEdit = (data) => {
        if (editIndex !== null) {
            const updated = [...categories];
            updated[editIndex] = data;
            setCategories(updated);
            setEditIndex(null);
        } else {
            setCategories([...categories, data]);
        }
        setShowAddCategory(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setForm((prev) => ({
                ...prev,
                image: reader.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const onClose = () => setShowAddCategory(false)
    const onAdd = handleAddOrEdit;
    const editData = editIndex !== null ? categories[editIndex] : null;


    console.log("DashContext productsoooo:", products);

    return (

        <DashContext.Provider
            value={{

                showAddCategory, setShowAddCategory,
                editIndex, setEditIndex,
                categoryProducts, setcategoryProducts,
                onClose, onAdd, categories, setCategories, editData,
                editingId, setEditingId, form, setForm, handleImageChange,
                productCategories, setProductCategories, products, setProducts,
                open, setOpen

            }}>
            {children}
        </DashContext.Provider>
    )


}

