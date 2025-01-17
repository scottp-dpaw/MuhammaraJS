var muhammara = require("../muhammara");

describe("ImagesAndFormsForwardReferenceTest", function () {
  it("should complete without error", function () {
    var pdfWriter = muhammara.createWriter(
      __dirname + "/output/ImagesAndFormsForwardReferenceTest.PDF"
    );
    var page = pdfWriter.createPage(0, 0, 595, 840);
    var pageContentContext = pdfWriter.startPageContentContext(page);

    pageContentContext.q().cm(500, 0, 0, 400, 0, 0);

    // allocate an id for an image, to be used later
    var imageXObjectID = pdfWriter.getObjectsContext().allocateNewObjectID();
    pageContentContext.doXObject(
      page.getResourcesDictionary().addImageXObjectMapping(imageXObjectID)
    );

    // add required PDF procsets for image
    page.getResourcesDictionary().addProcsetResource(muhammara.KProcsetImageB);
    page.getResourcesDictionary().addProcsetResource(muhammara.KProcsetImageC);
    page.getResourcesDictionary().addProcsetResource(muhammara.KProcsetImageI);

    pageContentContext.Q().q().cm(1, 0, 0, 1, 0, 400);

    var formXObjectID = pdfWriter.getObjectsContext().allocateNewObjectID();
    pageContentContext
      .doXObject(
        page.getResourcesDictionary().addFormXObjectMapping(formXObjectID)
      )
      .Q()
      .q();

    var tiffFormXObjectID = pdfWriter.getObjectsContext().allocateNewObjectID();
    pageContentContext
      .doXObject(
        page.getResourcesDictionary().addFormXObjectMapping(tiffFormXObjectID)
      )
      .Q()
      .q()
      .cm(1, 0, 0, 1, 100, 500);

    var simpleFormXObjectID = pdfWriter
      .getObjectsContext()
      .allocateNewObjectID();
    pageContentContext.doXObject(
      page.getResourcesDictionary().addFormXObjectMapping(simpleFormXObjectID)
    );

    pageContentContext.Q();

    pdfWriter.writePage(page);

    // now create all the xobjects
    pdfWriter.createImageXObjectFromJPG(
      __dirname + "/TestMaterials/images/otherStage.JPG",
      imageXObjectID
    );
    pdfWriter.createFormXObjectFromJPG(
      __dirname + "/TestMaterials/images/otherStage.JPG",
      formXObjectID
    );
    pdfWriter.createFormXObjectFromTIFF(
      __dirname + "/TestMaterials/images/tiff/jim___ah.tif",
      tiffFormXObjectID
    );

    var xobjectForm = pdfWriter.createFormXObject(
      0,
      0,
      200,
      100,
      simpleFormXObjectID
    );
    xobjectForm
      .getContentContext()
      .q()
      .k(0, 100, 100, 0)
      .re(0, 0, 200, 100)
      .f()
      .Q();
    pdfWriter.endFormXObject(xobjectForm);
    pdfWriter.end();
  });
});
