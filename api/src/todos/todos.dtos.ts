import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateToDoDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateToDoDTO {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  done?: boolean;
}
