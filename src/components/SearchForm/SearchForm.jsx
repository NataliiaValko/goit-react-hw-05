import styles from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.elements.searchQuery.value.trim();
    if (!query) return;

    onSubmit(query);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Search movie
          <input className={styles.input} name="searchQuery" />
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
