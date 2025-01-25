import { Module } from "@nestjs/common";
import { ProjectionController } from "src/Controller/Projection/Projection.controller";
import { ProjectionDAO } from "src/Projection/DAOs/ProjectionDAO";

@Module({
    imports: [],
    controllers: [ProjectionController],
    providers: [ProjectionDAO],
    exports: []
})
export class ProjectionModule {}