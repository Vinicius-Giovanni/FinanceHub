def to_camel(value: str) -> str:
    """
    Converte uma string no formato snake_case para camelCase.
    """
    parts = value.split("_")

    return parts[0] + "".join(
        part.capitalize()
        for part in parts[1:]
    )