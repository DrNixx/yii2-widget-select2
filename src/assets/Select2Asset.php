<?php
namespace onix\assets;

class Select2Asset extends AssetBundle
{
    public function init()
    {
        $this->setSourcePath('@bower/select2/dist');
        $this->setupAssets('css', ['css/select2']);
        $this->setupAssets('js', ['js/select2.full']);

        parent::init();
    }
}
