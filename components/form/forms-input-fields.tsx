import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FieldProps = {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string[];
  textarea?: boolean;
  helperText?: string;
};

export default function FormField({
  label,
  name,
  id,
  placeholder,
  required,
  onChange,
  error,
  textarea,
  helperText,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {!textarea ? (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
        />
      ) : (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
        />
      )}

      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
